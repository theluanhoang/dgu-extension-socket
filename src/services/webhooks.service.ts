import { BAD_REQUEST } from "@/core";
import { transactionValidation } from "@/helpers";
import { TransactionModel, UsageModel } from "@/models";
import TransactionService from "@/services/transaction.service";
import { IRequestTransaction, IUsage } from "@/types";
import SocketService from "./socket.service";

class WebhooksService {
    handleBankTransfer = async (transactions: IRequestTransaction[]) => {
        // NOTE: Need to optimize performance
        const updatedUsageArray: (IUsage | null)[] = await Promise.all(
            transactions.map(async (transaction) => {
                const regex = /DGUPAYMENT-(\d+)/;
                const match = transaction.description.match(regex);
                const userId = match ? match[1] : null;
                const currentTransaction = await TransactionModel.findOne({
                    cassoTransactionId: transaction.id,
                });

                if (!userId || currentTransaction) return null;

                try {
                    const updatedUsage = await UsageModel.findOneAndUpdate(
                        { userId },
                        { $inc: { cash: transaction.amount } },
                        { upsert: true, new: true },
                    );

                    const { error, value } = transactionValidation({
                        cassoTransactionId: transaction.id,
                        bankTransactionId: transaction.tid,
                        cash: transaction.amount,
                        userId,
                    });

                    if (error) throw new BAD_REQUEST(error.details[0].message, 99);

                    await TransactionService.saveTransaction(value);

                    await SocketService.handleNotificationPaymentStatus(userId, true);

                    return updatedUsage;
                } catch (error) {
                    await SocketService.handleNotificationPaymentStatus(userId, false);
                    return null;
                }
            }),
        );

        const updatedUsage = updatedUsageArray.filter((usage) => usage !== null);
        return { result: updatedUsage };
    };
}

export default new WebhooksService();

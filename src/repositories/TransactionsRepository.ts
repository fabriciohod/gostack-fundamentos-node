import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc: Omit<Balance, 'total'>, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acc.income += transaction.value;
            break;
          case 'outcome':
            acc.outcome += transaction.value;
            break;
          default:
            break;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;

declare global {
    interface Window {
      PaystackPop: {
        /**
         * Initializes a new transaction.
         */
        newTransaction: (options: {
          key: string;
          email: string;
          amount: number;
          currency?: string;
          ref?: string;
          callback?: () => void;
          onClose?: () => void;
        }) => void;
        // You can add more methods here as needed
      };
    }
  }
  export {};
  
let PaystackPromise: Promise<typeof window.PaystackPop> | null = null;

const PAYSTACK_SCRIPT_SRC = "https://js.paystack.co/v1/inline.js";

const loadPaystackScript = (): Promise<typeof window.PaystackPop> => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve(window.PaystackPop); // Paystack script is already loaded
      return;
    }

    // Check if script is already added to the DOM
    const existingScript = document.querySelector(
      `script[src="${PAYSTACK_SCRIPT_SRC}"]`
    );
    if (existingScript) {
      (existingScript as HTMLScriptElement).onload = () =>
        resolve(window.PaystackPop);
      (existingScript as HTMLScriptElement).onerror = () =>
        reject(new Error("Paystack script failed to load."));
      return;
    }

    // Dynamically inject Paystack script
    const script = document.createElement("script");
    script.src = PAYSTACK_SCRIPT_SRC;
    script.async = true;

    script.onload = () => {
      if (window.PaystackPop) {
        resolve(window.PaystackPop);
      } else {
        reject(new Error("PaystackPop not initialized after script load."));
      }
    };

    script.onerror = () => reject(new Error("Failed to load Paystack script"));

    document.body.appendChild(script);
  });
};

const getPaystack = (): Promise<typeof window.PaystackPop> => {
  if (!PaystackPromise) {
    PaystackPromise = loadPaystackScript();
  }
  return PaystackPromise;
};

export default getPaystack;

declare global {
  interface Window {
    Razorpay: new (options: any) => {
      open: () => void;
    };
  }
}

export default global
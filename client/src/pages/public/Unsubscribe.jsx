import React from 'react';
import { FaCircleCheck, FaEnvelope, FaBan } from 'react-icons/fa6';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const Unsubscribe = () => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full shadow-xl border-base-200" bodyClassName="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBan className="text-3xl text-base-content/40" />
          </div>
          <h1 className="text-3xl font-black text-base-content mb-2">Unsubscribe</h1>
          <p className="text-sm text-base-content/60">
            We're sorry to see you go. Enter your email to opt out of marketing communications.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCircleCheck className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-2">Unsubscribed</h3>
            <p className="text-base-content/60 mb-6">
              You have been successfully removed from our mailing list.
            </p>
            <Button to="/" variant="primary" className="w-full">
              Return Home
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={<FaEnvelope />}
              required
              disabled={status === "loading"}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full font-bold"
              loading={status === "loading"}
              disabled={status === "loading"}
            >
              Unsubscribe
            </Button>

            <p className="text-xs text-center text-base-content/40 italic">
              Note: It may take up to 48 hours for changes to take effect.
            </p>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Unsubscribe;
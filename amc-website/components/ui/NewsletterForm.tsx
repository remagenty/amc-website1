"use client";

export function NewsletterForm() {
  return (
    <form
      className="flex w-full sm:w-auto gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Votre adresse email"
        className="flex-1 sm:w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amc-yellow"
      />
      <button
        type="submit"
        className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap rounded-lg"
      >
        S&apos;abonner
      </button>
    </form>
  );
}

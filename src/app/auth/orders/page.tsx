import OrdersForm from "@/components/OrdersForm";

export default function Orders() {
  return (
    <section className="min-h-[calc(70vh)] p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <OrdersForm />
        </tbody>
      </table>
    </section>
  );
}

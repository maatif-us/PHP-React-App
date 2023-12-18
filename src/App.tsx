import { CustomersList } from "./components/CustomersList";

const App = () => {
  return (
    <main className="flex flex-col items-center bg-primary min-h-screen">
      <div className="container p-4">
        <h1 className="text-3xl font-sans font-semibold">
          Customer's Crud App
        </h1>
        <CustomersList />
      </div>
    </main>
  );
};

export default App;

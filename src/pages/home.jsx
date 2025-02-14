import { useAuthContext } from "@/contexts/auth";

const HomePage = () => {
  const { isInitializing } = useAuthContext();

  if (isInitializing) return null;

  return <h1>Home page</h1>;
};

export default HomePage;

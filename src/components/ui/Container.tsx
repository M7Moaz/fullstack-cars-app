const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="container mx-auto px-3 sm:px-6 md:px-12 xl:px-32">
      {children}
    </div>
  );
};

export default Container;

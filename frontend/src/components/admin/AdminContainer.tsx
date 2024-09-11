const AdminContainer = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="flex-1 px-4 my-4">{children}</div>;
};

export default AdminContainer;

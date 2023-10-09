const ProductContainer = ({ children }) => {
  return (
    <div className="border-t-1 border-b-1 border-black bg-purple-200 p-2 flex flex-col items-center">
      {children}
    </div>
  );
};
export default ProductContainer;

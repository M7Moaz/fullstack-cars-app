import Container from "./Container";

export const CardsLoader = () => {
  return (
    <section className="bg-white py-10">
      <Container>
        <div className="animate-pulse">
          <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg"></h1>

          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg "></p>
          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 "></p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="w-full ">
                <div className="w-full h-64 bg-gray-300 rounded-lg "></div>

                <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg "></h1>
                <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg "></p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

function Home() {
  return (
    <main
      className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#060B0F", minHeight: "100vh" }}
    >
      <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 text-center">BlockCertify</h1>
      <p className="text-base sm:text-lg text-white mb-8 text-center max-w-2xl">
        A Certificate Verification Platform
        <br />
        Secure, Transparent, and Efficient
      </p>
      
    </main>
  );
}

export default Home;
function About() {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#060B0F] min-h-screen">
      <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
      <div className="bg-[#060B0F] p-8 rounded-xl w-full max-w-screen-md">
        <p className="text-white mb-4">
          We are a dedicated team committed to providing innovative solutions in the field of blockchain technology. Our mission is to empower individuals and organizations through secure and transparent digital solutions.
        </p>
        <h3 className="text-2xl font-bold text-white mb-2">Our Mission</h3>
        <p className="text-white mb-4">
          Our mission is to bridge the gap between technology and real-world applications, making blockchain accessible and understandable for everyone.
        </p>
        <h3 className="text-2xl font-bold text-white mb-2">Meet the Team</h3>
        <ul className="text-white mb-4">
          <li>Huzaif - Project Member</li>
          <li>Neeraj - Project Member</li>
          <li>Raziullah - Project Member</li>
          <li>Shahzeb - Project Member</li>
        </ul>
        <h3 className="text-2xl font-bold text-white mb-2">Contact Us</h3>
        <p className="text-white">
          For inquiries, please reach out to us at <a href="neerajbiradar03@gmail.com" className="text-blue-400">neerajbiradar03@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default About;
import { useReadContract } from "thirdweb/react";
import { useState, useEffect } from "react";
import { client, contract } from "../client";

export default function Certificates() {
  const [fetchMethod, setFetchMethod] = useState("signature");
  const [certificateID, setCertificateID] = useState("");
  const [signature, setSignature] = useState("");
  const [final, setFinal] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");
  const [certificates, setCertificates] = useState<any[]>([]);

  const { data, isPending, error } = useReadContract({
    contract,
    method: fetchMethod === "signature"
      ? "function getCertificatesBySignature(string signature) view returns ((string certificateID, string name, string studentID, string course, string organization, string dateOfIssue, string publisher, string imageURL)[])"
      : "function getCertificateByID(string certificateID) view returns ((string certificateID, string name, string studentID, string course, string organization, string dateOfIssue, string publisher, string imageURL))",
    params: fetchMethod === "signature" ? [signature] : [certificateID]
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setCertificates(data);
      } else {
        setCertificates([data]);
      }
    }
  }, [data]);

  // console.log(data)
  const handleUpdateSignature = () => {
    // console.log(final)
    if (fetchMethod == "signature")
      setSignature(final)
    else {
      setCertificateID(final)
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessage("Certificate ID copied!");
      setTimeout(() => setCopiedMessage(""), 5000);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#060B0F", minHeight: "100vh" }}>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Fetch Certificate</h2>

      <select
        value={fetchMethod}
        onChange={(e) => setFetchMethod(e.target.value)}
        className="mb-4 bg-[#202d37] text-white rounded-xl py-2 px-3"
      >
        <option value="signature">Fetch by Email</option>
        <option value="id">Fetch by ID</option>
      </select>

      {fetchMethod === "signature" ? (
        <div className="flex w-full max-w-md mb-8 gap-2">
          <input
            type="text"
            value={final}
            onChange={(e) => setFinal(e.target.value.toLowerCase())}
            placeholder="Enter Signature ID"
            className="flex-grow shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
          />
          <button
            onClick={handleUpdateSignature}
            className="bg-[#202d37] hover:bg-[#94a3ad] hover:text-[#202d37] text-white py-2 px-4 rounded-xl transition-transform hover:scale-105 focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      ) : (
        <div className="flex w-full max-w-md mb-8 gap-2">
          <input
            type="text"
            value={final}
            onChange={(e) => setFinal(e.target.value)}
            placeholder="Enter Certificate ID"
            className="flex-grow shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
          />
          <button
            onClick={handleUpdateSignature}
            className="bg-[#202d37] hover:bg-[#94a3ad] hover:text-[#202d37] text-white py-2 px-4 rounded-xl transition-transform hover:scale-105 focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      )}

      <div className="w-full max-w-4xl">

        {certificates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate, index) => (
                <div
                  key={index}
                  className="bg-[#ffffff1a] backdrop-blur-md rounded-xl shadow-lg p-6 transition-transform hover:scale-105 text-white"
                >
                  <p className="mb-1">
                    <span className="font-medium">Certificate ID:</span>
                    <button onClick={() => copyToClipboard(certificate.certificateID)} className={`underline mx-2 ${copiedMessage === "Certificate ID copied!" ? "text-green-500" : "text-blue-500"}`}>
                      {copiedMessage === "Certificate ID copied!" ? "Copied" : "Copy"}
                    </button>
                  </p>

                  <p className="mb-1">
                    <span className="font-medium">Name:</span> {certificate.name}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Student ID:</span> {certificate.studentID}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Course:</span> {certificate.course}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Organization:</span> {certificate.organization}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Date of Issue:</span> {certificate.dateOfIssue}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Publisher:</span> {certificate.publisher}
                  </p>
                  <a className="text-blue-500" href={certificate.imageURL} target="_blank" rel="noopener noreferrer">
                    Certificate URL
                  </a>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 col-span-full">No certificate found.</p>
        )}
      </div>
    </div>
  );
}
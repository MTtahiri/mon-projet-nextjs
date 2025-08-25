import Image from "next/image";

export default function ConsultantCard({ name, role, photo, email }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 flex flex-col items-center text-center">
      <div className="w-32 h-32 relative mb-4">
        <Image src={photo} alt={name} fill className="object-cover rounded-full" />
      </div>
      <h2 className="text-xl font-bold mb-1">{name}</h2>
      <p className="text-gray-600 mb-3">{role}</p>
      <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
        Contacter
      </a>
    </div>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <h2 className="text-2xl text-blue-800 font-bold">Welcome to Subhajit Das Portfolio</h2>
     <h3 className="text-red-500">Contact No : 9804647078</h3>
     <h5 className="text-fuchsia-700">Email:subhajit87@gmail.com</h5>
     <h5 className="text-emerald-300">Designation:Assistant Engineer,PWD,Nabanna</h5>
     <h6>325,Sarat Chatterjee Road,Howrah-711102</h6>
    </div>
  );
}

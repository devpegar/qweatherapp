import { WiSunrise, WiSunset } from "react-icons/wi";
const SunRise = ({ salida, puesta }) => {
  return (
    <div className="flex justify-around">
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl py-2">Amanecer</p>
        <p className="font-bold text-lg text-center py-2">{salida}</p>
        <WiSunrise className="text-7xl text-yellow-400" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl py-2">Atardecer</p>
        <p className="font-bold text-lg text-center py-2">{puesta}</p>
        <WiSunset className="text-7xl text-yellow-600" />
      </div>
    </div>
  );
};

export default SunRise;

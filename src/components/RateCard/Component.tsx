import { Star } from "lucide-react";

import Button from "../ui/Button";
import { useEffect, useState } from "react";

interface Data extends User {
  cnpj?: string;
  rate?: number;
  profileImage?: string;
  totalRated?: number;
}

interface RateCardProps {
  user: Data;
}

export default function RateCard({ user }: RateCardProps) {
  const [currentRate, setCurrentRate] = useState(user.rate!);

  const getRate = (rate: number, avg: number): string => {
    const fill = rate + 1 > avg ? "#f2da00" : "#ffffff";
    return fill;
  };

  return (
    <div className="w-[400px] h-[166px] px-4 py-3 rounded-md bg-white shadow">
      <div className="flex flex-row gap-4">
        <picture className="w-20 h-20 border">
          <img src={user.profileImage} />
        </picture>
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold text-clip h-6 overflow-hidden">{user.name}</h3>
          {user.type === "supplier" && <p className="font-mono text-xs w-full">CNPJ: {user.cnpj}</p>}
          <div className="flex justify-between items-center pt-2">
            <p>Avaliações ({user.totalRated}):</p>
            <div className="flex flex-row gap-1 items-center">
              <Star
                size={22}
                stroke="#f2da00"
                fill={getRate(user.rate!, 1)}
                className="hover:cursor-pointer"
                onMouseOver={() => setCurrentRate(1)}
                onMouseLeave={() => setCurrentRate(user.rate!)}
              />
              <Star
                size={22}
                stroke="#f2da00"
                fill={getRate(currentRate, 2)}
                className="hover:cursor-pointer"
                onMouseOver={() => setCurrentRate(2)}
                onMouseLeave={() => setCurrentRate(user.rate!)}
              />
              <Star
                size={22}
                stroke="#f2da00"
                fill={getRate(currentRate, 3)}
                className="hover:cursor-pointer"
                onMouseOver={() => setCurrentRate(3)}
                onMouseLeave={() => setCurrentRate(user.rate!)}
              />
              <Star
                size={22}
                stroke="#f2da00"
                fill={getRate(currentRate, 4)}
                className="hover:cursor-pointer"
                onMouseOver={() => setCurrentRate(4)}
                onMouseLeave={() => setCurrentRate(user.rate!)}
              />
              <Star
                size={22}
                stroke="#f2da00"
                fill={getRate(currentRate, 5)}
                className="hover:cursor-pointer"
                onMouseOver={() => setCurrentRate(5)}
                onMouseLeave={() => setCurrentRate(user.rate!)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <Button>Avaliar</Button>
    </div>
  );
}

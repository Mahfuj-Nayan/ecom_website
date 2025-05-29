"use client";

import { Input } from "@/components/ui/input";
import { CircleChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    const minVal = min !== "" ? min : "0";
    const maxVal = max !== "" ? max : "10000"; // empty string will imply no upper bound

    if (min !== "" || max !== "") {
      params.set("price", `${minVal}-${maxVal}`);
    } else {
      params.delete("price");
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="text-sm px-1 w-[50px]"
        />
        <span>-</span>
        <Input
          type="text"
          placeholder="Max"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="text-sm px-1 w-[50px]"
        />
        <button onClick={handleFilter} className="px-0">
          <CircleChevronRight className="items-center" />
        </button>
      </div>
    </div>
  );
}

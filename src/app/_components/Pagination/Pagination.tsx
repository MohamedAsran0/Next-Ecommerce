"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function Pagination({ maxPage }: { maxPage: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const [isPending, startTransition] = useTransition();

    const goToPage = (page: number) => {
        startTransition(() => {
            router.push(`?page=${page}`);
        });
    };

    return (
        <div className="flex justify-center gap-4 mt-10">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1 || isPending}
                className="group p-[4px] rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow disabled:opacity-50"
            >
                <div className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[8px] px-5 py-2 flex gap-2 items-center">
                    <span className="font-semibold">{isPending && currentPage === 2? <ClipLoader size={20} /> : "Previous"}</span>
                </div>
            </button>

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === maxPage || isPending}
                className="group p-[4px] rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow disabled:opacity-50"
            >
                <div className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[8px] px-5 py-2 flex gap-2 items-center">
                    <span className="font-semibold">{isPending && currentPage === 1 ? <ClipLoader size={20} /> : "Next"}</span>
                </div>
            </button>
        </div>
    );
}
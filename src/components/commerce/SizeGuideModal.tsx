"use client";

import { Modal } from "@/components/ui/Modal";
import { sizeGuideRows } from "@/lib/site";

type SizeGuideModalProps = {
  open: boolean;
  onClose: () => void;
  productName?: string;
};

export function SizeGuideModal({ open, onClose, productName }: SizeGuideModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Size guide">
      <div className="max-h-[85dvh] overflow-y-auto p-6 sm:p-8">
        <p className="eyebrow text-rose-600">ELARÉ Standard</p>
        <h2 className="mt-2 text-2xl">Size guide</h2>
        <p className="mt-2.5 text-sm leading-relaxed text-espresso-500">
          Our blocks are drafted to fit an average Pakistani body. Measurements are taken flat and
          doubled, in inches
          {productName ? (
            <>
              {" "}for <span className="font-display italic">{productName}</span>
            </>
          ) : null}
          . If you sit between two sizes, we recommend the larger.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[26rem] border-collapse text-sm">
            <caption className="sr-only">Body measurements by size</caption>
            <thead>
              <tr className="border-b border-plum-800/20">
                {["Size", "Bust", "Waist", "Hip", "Kameez length"].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-3 py-2.5 text-left text-[0.625rem] font-medium uppercase tracking-[0.16em] text-plum-900"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeGuideRows.map((row, index) => (
                <tr
                  key={row.size}
                  className={`border-b border-ivory-300 ${index % 2 === 0 ? "bg-ivory-100" : ""}`}
                >
                  <th
                    scope="row"
                    className="px-3 py-2.5 text-left font-medium tracking-[0.1em] text-plum-900"
                  >
                    {row.size}
                  </th>
                  <td className="px-3 py-2.5 text-espresso-500">{row.bust}</td>
                  <td className="px-3 py-2.5 text-espresso-500">{row.waist}</td>
                  <td className="px-3 py-2.5 text-espresso-500">{row.hip}</td>
                  <td className="px-3 py-2.5 text-espresso-500">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-3 border-t border-ivory-300 pt-5 text-sm leading-relaxed text-espresso-500">
          <p>
            <strong className="font-medium text-plum-900">Between sizes?</strong> Our kurtas run
            true to size. Sharpen or relax the waist with a tailor — we include let-down allowance in
            most trousers for exactly this reason.
          </p>
          <p>
            <strong className="font-medium text-plum-900">Need a second opinion?</strong> Send us
            your measurements on WhatsApp and our styling team will reply within one working day.
          </p>
        </div>
      </div>
    </Modal>
  );
}

// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { createPortal } from "react-dom";
// import { categories } from "@/lib/blog-data";

// export default function NewBlogModal() {
//   const [open, setOpen] = useState(false);
//   const [visible, setVisible] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//     requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
//   };

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(() => setOpen(false), 200);
//   };

//   return (
//     <>
//       <button
//         className="flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white transition hover:bg-secondary"
//         type="button"
//         onClick={handleOpen}
//       >
//         نوشتن بلاگ جدید
//       </button>

//       {open &&
//         createPortal(
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="modal-title"
//             className={`fixed inset-0 z-9999 flex items-center justify-center p-4 transition-opacity duration-200 ${
//               visible ? "opacity-100" : "pointer-events-none opacity-0"
//             }`}
//             style={{
//               backgroundColor: visible ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
//             }}
//             onClick={handleClose}
//           >
//             <div
//               className={`w-full max-w-180 rounded-2xl bg-bg p-8 transition-all duration-200 ${
//                 visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
//               }`}
//               dir="rtl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2
//                 id="modal-title"
//                 className="mb-6 text-center text-xl font-black text-text-default"
//               >
//                 اضافه کردن بلاگ جدید
//               </h2>

//               <form onSubmit={(e) => e.preventDefault()}>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="blog-title"
//                     className="mb-2 block text-right text-sm font-bold text-text-default"
//                   >
//                     عنوان بلاگ
//                   </label>
//                   <div className="relative">
//                     <span className="absolute top-2 right-9 w-px h-6 bg-neutral-gray-border" />

//                     <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40">
//                       <Image
//                         src="/icons/person-border.svg"
//                         width={22}
//                         height={22}
//                         alt=""
//                       />
//                     </span>
//                     <input
//                       id="blog-title"
//                       type="text"
//                       placeholder="مثال: راهنمای کامل خرید و سرمایه‌گذاری در ..."
//                       className="h-11 w-full rounded-lg border border-neutral-gray-border bg-white pr-11 pr-4 text-sm text-text-default outline-none placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="blog-category"
//                     className="mb-2 block text-right text-sm font-bold text-text-default"
//                   >
//                     دسته بندی
//                   </label>
//                   <div className="relative">
//                     <select
//                       id="blog-category"
//                       defaultValue=""
//                       className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-neutral-gray-border bg-white pl-9 pr-4 text-sm text-text-secondary/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                     >
//                       <option value="" disabled>
//                         مثال: آموزشی
//                       </option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.title}
//                         </option>
//                       ))}
//                     </select>
//                     <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
//                       <svg
//                         fill="none"
//                         height="16"
//                         viewBox="0 0 16 16"
//                         width="16"
//                       >
//                         <path
//                           d="M4 6l4 4 4-4"
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="1.5"
//                         />
//                       </svg>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-8">
//                   <label
//                     htmlFor="blog-body"
//                     className="mb-2 block text-right text-sm font-bold text-text-default"
//                   >
//                     بدنه بلاگ
//                   </label>
//                   <textarea
//                     id="blog-body"
//                     placeholder="متن بدنه بلاگ خودرا بنویسید"
//                     rows={5}
//                     className="w-full resize-none rounded-lg border border-neutral-gray-border bg-white px-4 py-3 text-sm text-text-default outline-none placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-4 sm:flex-row">
//                   <button
//                     type="button"
//                     onClick={handleClose}
//                     className="order-2 md:order-1 flex h-10 w-full items-center justify-center rounded-lg border border-neutral-gray-border bg-white font-bold text-text-default transition hover:bg-neutral-gray sm:order-1 sm:flex-1"
//                   >
//                     انصراف
//                   </button>
//                   <button
//                     type="submit"
//                     className="order-1 md:order-2 flex h-10 w-full items-center justify-center rounded-lg bg-secondary font-bold text-white transition hover:opacity-90 sm:order-2 sm:flex-1"
//                   >
//                     ثبت و انتشار بلاگ
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>,
//           document.body,
//         )}
//     </>
//   );
// }

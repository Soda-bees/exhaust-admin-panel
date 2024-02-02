// import React from 'react';

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <li key={i} className={`inline-block px-3 py-2 cursor-pointer ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-gray-300`} onClick={() => onPageChange(i)}>
//           {i}
//         </li>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className="mt-5 flex items-center justify-center">
//       <ul className="flex space-x-2">
//         {currentPage > 1 && (
//           <>
//             <li
//               className={`inline-block px-3 py-2 cursor-pointer bg-white text-blue-500 border border-gray-300`}
//               onClick={() => onPageChange(1)}
//             >
//               First
//             </li>
//             <li
//               className={`inline-block px-3 py-2 cursor-pointer bg-white text-blue-500 border border-gray-300`}
//               onClick={() => onPageChange(currentPage - 1)}
//             >
//               Previous
//             </li>
//           </>
//         )}
//         {renderPageNumbers()}
//         {currentPage < totalPages && (
//           <>
//             <li
//               className={`inline-block px-3 py-2 cursor-pointer bg-white text-blue-500 border border-gray-300`}
//               onClick={() => onPageChange(currentPage + 1)}
//             >
//               Next
//             </li>
//             <li
//               className={`inline-block px-3 py-2 cursor-pointer bg-white text-blue-500 border border-gray-300`}
//               onClick={() => onPageChange(totalPages)}
//             >
//               Last
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Pagination;


import React from 'react';
import images from '../../services/images';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const displayPages = 2;

        if (totalPages <= displayPages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li
                        key={i}
                        className={`inline-block  cursor-pointer px-2 text-md rounded-md ${currentPage === i ? 'bg-blue text-white border border-blue' : 'border'
                    } `}
                        // onClick={() => onPageChange(i)}
                    >
                        {i}
                    </li>
                );
            }
        } else {
            const leftEllipsis = currentPage > displayPages;
            const rightEllipsis = currentPage < totalPages - displayPages + 1;
            for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
                pageNumbers.push(
                    <li
                        key={i}
                        className={`inline-block  cursor-pointer px-2 text-md rounded-md ${currentPage === i ? 'bg-blue text-white border border-blue' : 'border'
                            } `}
                        // onClick={() => onPageChange(i)}
                    >
                        {i}
                    </li>
                );
            }

            if (rightEllipsis) {
                pageNumbers.push(<li key="ellipsis-right"
                className='flex items-end text-blue'
                >...</li>);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="mt-5 ml-5 flex items-center justify-center">
            <ul className="flex space-x-1">
                {currentPage > 1 && (
                    <>
                        <li
                            className={`flex items-center px-2 rounded-md cursor-pointer border border-gray-300 active:opacity-50`}
                            onClick={() => onPageChange(1)}
                        >
                            <img src={images.paginationLeft} className='w-4 h-4' />
                        </li>
                        <li
                            className={`flex items-center px-2 rounded-md active:opacity-50 cursor-pointer  border`}
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            <img src={images.paginationLeft2} className='w-2.5 h-4' />
                        </li>
                    </>
                )}
                {renderPageNumbers()}
                {currentPage < totalPages && (
                    <>
                        <li
                            className={`flex items-center px-2 rounded-md active:opacity-50 cursor-pointer  border `}
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            <img src={images.paginationRight2} className='2.5 h-4' />
                        </li>
                        <li
                            className={`flex items-center px-2 rounded-md active:opacity-50  cursor-pointer  border active:opacity-50`}
                            onClick={() => onPageChange(totalPages)}
                        >
                            <img src={images.paginationRight} className='w-4 h-4' />
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Pagination;

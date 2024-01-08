import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

interface TableColumn {
  key: string;
  name: string;
}
interface TableRow {
  id: number;
  [key: string]: any;
}

interface TableProps {
  header: TableColumn[];
  body: TableRow[];
  delete: (itemId: number) => void;
}

interface RowActionsProps {
  itemId: number;
  product_id: number;
  onDelete: (itemId: number) => void;
}

const RowActions: React.FC<RowActionsProps> = ({
  itemId,
  product_id,
  onDelete,
}) => (
  <td className="flex justify-around ">
    <button
      onClick={() => onDelete(itemId)}
      className="text-red-400 "
    >
      <IoMdCloseCircleOutline size={25} />
    </button>
    <Link className="text-blue-500 hover:text-fuchsia-900" href={`/products/${product_id}`}>See More</Link>
  </td>
);

const Table: React.FC<TableProps> = ({ header, body, delete: onDelete }) => {
  // HEADER OF TABLE
  const headerShow = header?.map((col, id) => (
    <th key={id} className="px-6 py-3 text-start">
      {col.name}
    </th>
  ));

  const bodyShow = body.map((row, index1) => (
    <tr key={index1} className="border-b relative hover:bg-slate-200 h-full">
      {header?.map((col, index2) => (
        <td key={index2} className="py-3 px-6">
          {col.key === "id" ? (
            index1 + 1
          ) : col.key === "image" ? (
            <Image src={row.product[col.key]} alt="" width={200} height={200} />
          ) : col.key === "title" ? (
            row.product[col.key]
          ) : col.key === "created_at" ? (
            new Date((row as any)[col.key]).toLocaleString()
          ) : (
            (row as any)[col.key]
          )}
        </td>
      ))}
      <RowActions
        product_id={row.product_id}
        itemId={row.id}
        onDelete={onDelete}
      />
    </tr>
  ));

  return (
    <table className="w-full">
      <thead className="p-7 text-gray-600">
        <tr>
          {headerShow}
          <th className="text-start"> settings </th>
        </tr>
      </thead>
      <tbody className=" text-gray-800">{bodyShow}</tbody>
    </table>
  );
};

export default Table;

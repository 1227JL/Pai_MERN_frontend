import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columnsAprendiz, ESTADOSAPRENDIZ } from "./data";
import { SearchIcon } from "./SerchIcon";
import { capitalize, quitarTildes } from "../helpers/Utils";
import ModalInstructor from "./ModalInstructor";
import ModalEliminarInstructor from "./ModalEliminarInstructor";
import ModalDetallesInstructor from "./ModalDetallesInstructor";
import useTitulada from "../hooks/useTitulada";
import useAprendiz from "../hooks/useAprendiz";
import { useNavigate } from "react-router-dom";
import { EyeIcon } from "./EyeIcon";

const statusColorMap = {
  "Etapa Lectiva": "success",
  "Formación Finalizada": "danger",
  Decersión: "danger",
  "Etapa Productiva": "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["nombre", "estado", "ver"];

export default function TableAprendices({aprendices}) {
  const navigate = useNavigate();
  const { busqueda } = useTitulada();
 
  const {
    setModalAprendiz,
  } = useAprendiz();
  const [filterValue, setFilterValue] = React.useState("" || busqueda);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "nombre",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columnsAprendiz;

    return columnsAprendiz.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...aprendices];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          quitarTildes(user.nombre)
            .toLowerCase()
            .includes(quitarTildes(filterValue).toLowerCase()) ||
          quitarTildes(user.email)
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== ESTADOSAPRENDIZ.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.estado.toLowerCase())
      );
    }

    return filteredUsers;
  }, [aprendices, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((aprendiz, columnKey) => {
    const cellValue = aprendiz[columnKey];

    switch (columnKey) {
      case "nombre":
        return (
          <User
            avatarProps={{ radius: "full", src: aprendiz.avatar }}
            description={aprendiz.email}
            name={cellValue}
          />
        );
      case "estado":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[aprendiz.estado]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "ver":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalles del Aprendiz">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon
                  onClick={() => {
                    navigate(`aprendiz/${aprendiz?.documento}`)
                  }}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Buscar por el nombre"
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Estado
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {ESTADOSAPRENDIZ.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Columnas
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columnsAprendiz.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                onClick={() => {
                  setModalAprendiz(true);
                }}
                className="bg-primary-100 text-white"
                endContent={<PlusIcon />}
              >
                Agregar
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {aprendices.length} Aprendices
            </span>
            <label className="flex items-center text-default-400 text-small">
              Aprendices por página:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
            </label>
          </div>
        </div>
        <ModalInstructor />
        <ModalDetallesInstructor />
        <ModalEliminarInstructor />
      </>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    aprendices,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    items.length,
    page,
    pages,
    hasSearchFilter,
    aprendices,
  ]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      showSelectionCheckboxes={false}
      isStriped={true}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="none"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "ver" ? "center" : "start"}
            allowsSorting={column.sortable}
            className={column.uid == 'estado' && "max-sm:hidden"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Aprendices no encontrados"} items={sortedItems}>
        {(aprendiz) => (
          <TableRow key={aprendiz._id}>
            {(columnKey) => (
              <TableCell className={columnKey == 'estado' && "max-sm:hidden"}>{renderCell(aprendiz, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

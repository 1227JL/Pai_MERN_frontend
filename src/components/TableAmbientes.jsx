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
} from "@nextui-org/react";
import {PlusIcon} from "./PlusIcon";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {columnsAmbiente, statusOptions, contratoOptions} from "./data";
import { SearchIcon } from "./SerchIcon";
import { capitalize, quitarTildes } from "../helpers/Utils";
import ModalAmbiente from "./ModalAmbiente";
import ModalDetallesAmbiente from "./ModalDetallesAmbiente";
import ModalEliminarAmbiente from "./ModalEliminarAmbiente";
import useAmbiente from "../hooks/useAmbiente";

const statusColorMap = {
  Disponible: "success",
  Inactivo: "danger",
  Vacaciones: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["numero", "categoria", "estado", "actions"];

export default function TableAmbientes() {

  const { ambientes, handleModalAmbiente, handleModalDetallesAmbiente, handleModalEliminarAmbiente } = useAmbiente()
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [numeroFilter, setNumeroFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "numero",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columnsAmbiente;

    return columnsAmbiente.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredAmbiente = [...ambientes];

    if (hasSearchFilter) {
      filteredAmbiente = filteredAmbiente.filter((ambiente) =>
        (`${ambiente?.bloque.toLowerCase()}-${ambiente?.numero.toString()}`).includes(filterValue)
      );
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredAmbiente = filteredAmbiente.filter((ambiente) =>
        Array.from(statusFilter).includes((ambiente.estado).toLowerCase()),
      );
    }
    if (numeroFilter !== "all" && Array.from(numeroFilter).length !== contratoOptions.length) {
      filteredAmbiente = filteredAmbiente.filter((ambiente) =>
        Array.from(numeroFilter).includes(quitarTildes(ambiente.contrato).toLowerCase()),
      );
    }

    return filteredAmbiente;
  }, [ambientes, filterValue, statusFilter, numeroFilter]);

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

  const renderCell = React.useCallback((ambiente, columnKey) => {
    const cellValue = ambiente[columnKey];

    switch (columnKey) {
      case "numero":
        return (
          <div className="flex items-center gap-2">
            <img src="/src/assets/ambiente.png" alt="" width={42}/>
            <p>{`${ambiente?.bloque}-${ambiente?.numero}`}</p>
          </div>
        );
      case "categoria":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{ambiente?.categoria}</p>
          </div>
        );
      case "area":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "estado":
        return (
          <Chip className="capitalize" color={statusColorMap[ambiente.estado]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger aria-label="Opciones">
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-labelledby="opciones-label">
                <DropdownItem onClick={()=>handleModalDetallesAmbiente(ambiente)}>View</DropdownItem>
                <DropdownItem onClick={()=>handleModalAmbiente(ambiente)}>Edit</DropdownItem>
                <DropdownItem onClick={()=>handleModalEliminarAmbiente(ambiente)}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden md:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Contrato
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={numeroFilter}
                  selectionMode="multiple"
                  onSelectionChange={setNumeroFilter}
                >
                  {contratoOptions.map((contrato) => (
                    <DropdownItem key={contrato.uid} className="capitalize">
                      {capitalize(contrato.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
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
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
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
                  {columnsAmbiente.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button onClick={handleModalAmbiente} className="bg-primary-100 text-white" endContent={<PlusIcon />}>
                Agregar
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {ambientes.length} Ambientes</span>
            <label className="flex items-center text-default-400 text-small">
                ambientes por página:
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
        <ModalAmbiente/>
        <ModalDetallesAmbiente/>
        <ModalEliminarAmbiente/>
      </>
    );
  }, [
    filterValue,
    statusFilter,
    numeroFilter,
    visibleColumns,
    onRowsPerPageChange,
    ambientes,
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
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, ambientes]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      // isHeaderSticky
      showSelectionCheckboxes={false}
      isStriped={true}
      selectionMode='none'
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
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
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Ambientes no encontrados"} items={sortedItems}>
        {(instructor) => (
          <TableRow key={instructor._id}>
            {(columnKey) => <TableCell>{renderCell(instructor, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

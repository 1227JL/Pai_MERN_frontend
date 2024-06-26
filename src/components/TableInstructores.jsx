import React, { useEffect } from "react";

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
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, statusOptions, contratoOptions } from "./data";
import { SearchIcon } from "./SerchIcon";
import { capitalize, quitarTildes } from "../helpers/Utils";
import useInstructor from "../hooks/useInstructor";
import ModalInstructor from "./ModalInstructor";
import ModalEliminarInstructor from "./ModalEliminarInstructor";
import ModalDetallesInstructor from "./ModalDetallesInstructor";
import { useLocation, useNavigate } from "react-router-dom";

const statusColorMap = {
  Activo: "success",
  Inactivo: "danger",
  Vacaciones: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "contrato",
  "area",
  "estado",
  "actions",
];

export default function TableInstructores() {
  const {
    instructores,
    busqueda,
    setModalInstructor,
    handleModalInstructor,
    handleModalDetallesInstructor,
    handleModalEliminarInstructor,
  } = useInstructor();

  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("" || busqueda);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const instructorSearch = query.get("nombre");

  useEffect(() => {
    if (instructorSearch) {
      setFilterValue(instructorSearch);
    }
  }, [instructorSearch]);

  useEffect(() => {
    // Verificar si filterValue está vacío y actuar en consecuencia
    if (filterValue) {
      // Si filterValue no está vacío, añadirlo a la URL
      navigate(`/consultar/instructores?name=${filterValue}`);
    } else {
      // Si filterValue está vacío, navegar sin parámetros
      navigate("/consultar/instructores");
    }
  }, [filterValue, navigate]);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [contratoFilter, setContratoFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "nombre",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...instructores];

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
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.estado.toLowerCase())
      );
    }
    if (
      contratoFilter !== "all" &&
      Array.from(contratoFilter).length !== contratoOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(contratoFilter).includes(
          quitarTildes(user.contrato).toLowerCase()
        )
      );
    }

    return filteredUsers;
  }, [instructores, filterValue, statusFilter, contratoFilter]);

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

  const renderCell = React.useCallback((instructor, columnKey) => {
    const cellValue = instructor[columnKey];

    switch (columnKey) {
      case "nombre":
        return (
          <User
            avatarProps={{ radius: "full", src: instructor.avatar }}
            description={instructor.email}
            name={cellValue}
          />
        );
      case "contrato":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {instructor.contrato}
            </p>
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
          <Chip
            className="capitalize"
            color={statusColorMap[instructor.estado]}
            size="sm"
            variant="flat"
          >
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
                <DropdownItem
                  onClick={() => handleModalDetallesInstructor(instructor)}
                >
                  View
                </DropdownItem>
                <DropdownItem onClick={() => handleModalInstructor(instructor)}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleModalEliminarInstructor(instructor)}
                >
                  Delete
                </DropdownItem>
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

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="mt-7 flex flex-col gap-4">
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
                <DropdownTrigger className="hidden md:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Contrato
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={contratoFilter}
                  selectionMode="multiple"
                  onSelectionChange={setContratoFilter}
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
                  {statusOptions.map((status) => (
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
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                onClick={() => {
                  setModalInstructor(true);
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
              Total {instructores.length} Instructores
            </span>
            <label className="flex items-center text-default-400 text-small">
              Instructores por página:
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
    contratoFilter,
    visibleColumns,
    onRowsPerPageChange,
    instructores,
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
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, instructores]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      // isHeaderSticky
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
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"Instructores no encontrados"}
        items={sortedItems}
      >
        {(instructor) => (
          <TableRow key={instructor._id}>
            {(columnKey) => (
              <TableCell>{renderCell(instructor, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

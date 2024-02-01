import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
  User,
} from "@nextui-org/react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { ChevronDown } from "./ChevronDown";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { auth, cerrarSesionAuth } = useAuth();
  const navigate = useNavigate();
  const { nombre, rol } = auth;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Consultar tituladas",
      href: "/consultar/tituladas"
    },
    {
      name: "Consultar instructores",
      href: "/consultar/instructores"
    },
    {
      name: "Consultar ambientes",
      href: "/consultar/ambientes"
    },
  ];

  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <p className="font-black text-3xl">
            Pa<span className="text-primary-100">i</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Consutar
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="p-2"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              className="p-2"
              key="tituladas"
              description="Consulta información de las distintas tituladas"
              startContent={
                <img
                  src="/src/assets/cap.png"
                  alt="icono tituladas"
                  height={35}
                  width={35}
                />
              }
              onPress={() => navigate("/consultar/tituladas")}
            >
              Consultar Tituladas
            </DropdownItem>
            <DropdownItem
              className="p-2"
              key="instructores"
              description="Consulta información de los distintos instructores"
              startContent={
                <img
                  src="/src/assets/instructor.png"
                  alt="icono instructores"
                  height={35}
                  width={35}
                />
              }
              onPress={() => navigate("/consultar/instructores")}
            >
              Consultar Instructores
            </DropdownItem>
            <DropdownItem
              className="p-2"
              key="ambientes"
              description="Consulta información de los distintos ambientes"
              startContent={
                <img
                  src="/src/assets/ambiente.png"
                  alt="icono ambientes"
                  height={35}
                  width={35}
                />
              }
              onPress={() => navigate("/consultar/ambientes")}
            >
              Consultar Ambientes
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown>
          <DropdownTrigger>
            <User name={nombre} description={rol} />
          </DropdownTrigger>
          <DropdownMenu
          >
            <DropdownItem key="profile">Mi perfil</DropdownItem>
            <DropdownItem key="logout" onPress={cerrarSesionAuth}>
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

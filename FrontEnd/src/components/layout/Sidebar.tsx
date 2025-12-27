import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import {
  Users,
  Folder,
  TrendingUpDown,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openRelatorios, setOpenRelatorios] = useState(false); 


  const menu = [
    { label: "Pessoas", path: "/pessoas", icon: <Users size={18} /> },
    { label: "Categorias", path: "/categorias", icon: <Folder size={18} /> },
    {
      label: "Transações",
      path: "/transacoes",
      icon: <TrendingUpDown size={18} />,
    },
  ];

  return (
    <Box width={220} height="100vh" bgcolor="#191919" color="white" p={2}>
      <Typography variant="h6" mb={3}>
        Sistema Financeiro
      </Typography>

      <List>
        {/* Menu principal */}
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: active ? "#2563EB" : "transparent",
                "&:hover": {
                  backgroundColor: active
                    ? "#2563EB"
                    : "rgba(255,255,255,0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 32 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}

        {/* Relatórios (expansível, sem rota ainda) */}
        <ListItemButton
          onClick={() => setOpenRelatorios((prev) => !prev)}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 32 }}>
            <BarChart3 size={18} />
          </ListItemIcon>
          <ListItemText primary="Relatórios" />
          {openRelatorios ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </ListItemButton>

        <Collapse in={openRelatorios} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Collapse in={openRelatorios} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => navigate("/relatorios/pessoas")}
                  sx={{
                    pl: 5,
                    borderRadius: 1,
                    mb: 0.5,
                    backgroundColor:
                      location.pathname === "/relatorios/pessoas"
                        ? "#2563EB"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        location.pathname === "/relatorios/pessoas"
                          ? "#2563EB"
                          : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <ListItemText primary="Por Pessoa" />
                </ListItemButton>

                <ListItemButton
                  onClick={() => navigate("/relatorios/categorias")}
                  sx={{
                    pl: 5,
                    borderRadius: 1,
                    backgroundColor:
                      location.pathname === "/relatorios/categorias"
                        ? "#2563EB"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        location.pathname === "/relatorios/categorias"
                          ? "#2563EB"
                          : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <ListItemText primary="Por Categoria" />
                </ListItemButton>
              </List>
            </Collapse>

          </List>
        </Collapse>
      </List>
    </Box>
  );
}
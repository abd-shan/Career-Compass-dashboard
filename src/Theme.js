
import { createContext,useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";




export const token= (mode)=>({
    
    ...(mode==="dark" ?{

grey: {
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#eeeedd",
    900: "#141414"
},
primary: {
    100: "#d0d1d5",
    200: "#a1a4ab",
    300: "#727681",
    400: "#1F2A40",
    500: "#141b2d",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509"
},
    greenAccent: {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1e5245",
        900: "#0f2922"
},
redAccent: {
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f"
},
blueAccent: {
    100: "#e1e2fe",
    200: "#c3c6fd",
    300: "#a4a9fc",
    400: "#868dfb",
    500: "#6870fa",
    600: "#535ac8",
    700: "#3e4396",
    800: "#2a2d64",
    900: "#151632"
},
    }:{
      grey: {
        100: "#030303",
        200: "#e0e0e0",
        300: "#c7c7c7",
        400: "#adadad",
        500: "#949494",
        600: "#757575",
        700: "#575757",
        800: "#383838",
        900: "#1a1a1a",
      },
    primary: {
        100: "#ffffff",
        200: "#f2f2f2",
        300: "#e6e6e6",
        400: "#ffffff",
        500: "#cccccc",
        600: "#ffffff",
        700: "#ffffff",
        800: "#464646",
        900: "#1a1a1a",
    },
    greenAccent: {
        100: "#e1f6f1",
        200: "#b3edd8",
        300: "#85e4bf",
        400: "#57dba6",
        500: "#29d28d",
        600: "#0ca96c",
        700: "#007e4b",
        800: "#00442b",
        900: "#00190a",
    },
    redAccent: {
        100: "#f8e0e0",
        200: "#f1c1c1",
        300: "#ea9f9f",
        400: "#e37e7e",
        500: "#dc5c5c",
        600: "#b73f3f",
        700: "#922222",
        800: "#6d0606",
        900: "#470000",
    },
    blueAccent: {
        100: "#eef0ff",
        200: "#d4d8ff",
        300: "#b9beff",
        400: "#9fa4ff",
        500: "#858aff",
        600: "#5961ff",
        700: "#2d34ff",
        800: "#0108ff",
        900: "#0000a3",
    }
            })

});
export const themeSetting = (mode) => {
  const colors = token(mode); // Assuming you have a token function that generates colors based on mode

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark' 
        ? {
            primary: {
              main: colors.primary[500], 
            },
            secondary: {
              main: colors.greenAccent[500], 
            },
            neutral: {
              dark: colors.primary[700],
              main: colors.primary[500],
              light: colors.primary[100]
            },
            background: {
              default: colors.primary[500]
            }
          } 
        : {
            primary: {
              main: colors.primary[100], 
            },
            secondary: {
              main: colors.greenAccent[500], 
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: colors.primary[400], 
            }
          }
      ),
    },
    typography: {
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 30 // Use fontSize instead of fontsize
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 25 
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 18
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 10
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 8
      }
    }
  };
};


  export const colorModeContext = createContext({
    toggleColorMode:()=>{}
  });


export const useMode =()=>{
    const [mode,setMode]= useState("dark");
    const colorMode= useMemo(
      ()=>({
        toggleColorMode:()=>
          setMode((prev)=>(prev==="light"?"dark":"light")),
      }),[]
    );
    const theme = useMemo(()=>createTheme(themeSetting(mode)),[mode]);
    console.log("hi")
    return[theme,colorMode];

     };
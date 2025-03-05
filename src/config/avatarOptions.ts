
import { CustomizationOptions } from '../Types'

// options for customization: 
export const customizationOptions: CustomizationOptions[] = [
    { label: "Eyes",
      option: "eyes",
      values: [
        "eva",
        "frame1",
        "frame2",
        "glow",
        "happy",
        "hearts",
        "robocop",
        "round",
        "roundFrame01",
        "roundFrame02",
        "sensor",
        "shade01"
      ]
    },
    { label: "Face",
      option: "face",
      values: [
        "round01",
        "round02",
        "square01",
        "square02",
        "square03",
        "square04"
      ]
    },
    { label: "Mouth",
      option: "mouth",
      values: [
        "bite",
        "diagram",
        "grill01",
        "grill02",
        "grill03",
        "smile01",
        "smile02",
        "square01",
        "square02"
      ]
    },
    { label: "Sides",
      option: "sides",
      values: [
        "antenna01",
        "antenna02",
        "cables01",
        "cables02",
        "round",
        "square",
        "squareAssymetric" 
      ]
    },
    // this actually doesn't seem to work from the API
    // { label: "Texture",
    //   option:"texture",
    //   values: [
    //     "camo01",
    //     "camo02",
    //     "circuits",
    //     "dirty01",
    //     "dirty02",
    //     "dots",
    //     "grunge01",
    //     "grunge02" 
    //   ]
    // },
    { label: "Top",
      option:"top",
      values: [
        "antenna",
        "antennaCrooked",
        "bulb01",
        "glowingBulb01",
        "glowingBulb02",
        "horns",
        "lights",
        "pyramid",
        "radar"
      ]
    }
  ]
  
  // color palette
  export const COLOR_PALETTE = [
    "FFFFFF",
    "C4C4C4",
    "888888",
    "555555",
    /*"#222222",*/
    "000000",
    "006600",
    /*"#22B14C",*/
    "02BE01",
    "51E119",
    "94E044",
    "FBFF5B",
    "E5D900",
    "E6BE0C",
    "E59500",
    "A06A42",
    "99530D",
    "633C1F",
    "6B0000",
    "9F0000",
    "E50000",
    "BB4F00",
    "FF755F",
    "FFC49F",
    "FFDFCC",
    "FFA7D1",
    "CF6EE4",
    "EC08EC",
    "820080",
    "FF3904",
    "020763",
    "0000EA",
    /*"#044BFF",*/
    "6583CF",
    "36BAFF",
    "0083C7",
    "00D3DD",
    "45FFC8",
    "5100FF",
  ]
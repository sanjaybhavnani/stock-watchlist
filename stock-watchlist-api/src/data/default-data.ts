import { Stock } from "../models/stock";
import { StockWatchListDb } from "./db";

export const defaultData: StockWatchListDb = {
  stocks: [],
  watchlists: [],
  alive: true
};

// Helper to generate a random price between 100 and 5000
function getRandomLastClose(): number {
  return parseFloat((Math.random() * (5000 - 100) + 100).toFixed(2));
}

export const stocksSeedData: Stock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ITC",
    name: "ITC Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "AXISBANK",
    name: "Axis Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HCLTECH",
    name: "HCL Technologies Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BAJFINANCE",
    name: "Bajaj Finance Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ASIANPAINT",
    name: "Asian Paints Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TITAN",
    name: "Titan Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ULTRACEMCO",
    name: "UltraTech Cement Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "WIPRO",
    name: "Wipro Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BAJAJFINSV",
    name: "Bajaj Finserv Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "POWERGRID",
    name: "Power Grid Corporation of India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "NTPC",
    name: "NTPC Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ONGC",
    name: "Oil & Natural Gas Corporation Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ADANIENT",
    name: "Adani Enterprises Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "JSWSTEEL",
    name: "JSW Steel Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TECHM",
    name: "Tech Mahindra Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HDFCLIFE",
    name: "HDFC Life Insurance Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "DIVISLAB",
    name: "Divi's Laboratories Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATASTEEL",
    name: "Tata Steel Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GRASIM",
    name: "Grasim Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "DRREDDY",
    name: "Dr. Reddy's Laboratories Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BPCL",
    name: "Bharat Petroleum Corporation Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BRITANNIA",
    name: "Britannia Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CIPLA",
    name: "Cipla Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "EICHERMOT",
    name: "Eicher Motors Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HEROMOTOCO",
    name: "Hero MotoCorp Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "INDUSINDBK",
    name: "IndusInd Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SHREECEM",
    name: "Shree Cement Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HDFCAMC",
    name: "HDFC Asset Management Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SBILIFE",
    name: "SBI Life Insurance Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BAJAJ-AUTO",
    name: "Bajaj Auto Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "M&M",
    name: "Mahindra & Mahindra Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GAIL",
    name: "GAIL (India) Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "IOC",
    name: "Indian Oil Corporation Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "COALINDIA",
    name: "Coal India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PIDILITIND",
    name: "Pidilite Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "DABUR",
    name: "Dabur India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ADANIPORTS",
    name: "Adani Ports and Special Economic Zone Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HAVELLS",
    name: "Havells India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "AMBUJACEM",
    name: "Ambuja Cements Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATAPOWER",
    name: "Tata Power Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "UPL",
    name: "UPL Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "NESTLEIND",
    name: "Nestle India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SIEMENS",
    name: "Siemens Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "APOLLOHOSP",
    name: "Apollo Hospitals Enterprise Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BERGEPAINT",
    name: "Berger Paints India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATACONSUM",
    name: "Tata Consumer Products Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MARICO",
    name: "Marico Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ICICIPRULI",
    name: "ICICI Prudential Life Insurance Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MUTHOOTFIN",
    name: "Muthoot Finance Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GODREJCP",
    name: "Godrej Consumer Products Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SRF",
    name: "SRF Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PAGEIND",
    name: "Page Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BOSCHLTD",
    name: "Bosch Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "COLPAL",
    name: "Colgate Palmolive (India) Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "DLF",
    name: "DLF Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "AUROPHARMA",
    name: "Aurobindo Pharma Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "LUPIN",
    name: "Lupin Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ICICIGI",
    name: "ICICI Lombard General Insurance Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HINDALCO",
    name: "Hindalco Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TORNTPHARM",
    name: "Torrent Pharmaceuticals Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PETRONET",
    name: "Petronet LNG Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "VOLTAS",
    name: "Voltas Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MCDOWELL-N",
    name: "United Spirits Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GODREJPROP",
    name: "Godrej Properties Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HINDPETRO",
    name: "Hindustan Petroleum Corporation Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SAIL",
    name: "Steel Authority of India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BANKBARODA",
    name: "Bank of Baroda",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "IDFCFIRSTB",
    name: "IDFC First Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CANBK",
    name: "Canara Bank",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BANDHANBNK",
    name: "Bandhan Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PNB",
    name: "Punjab National Bank",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "FEDERALBNK",
    name: "Federal Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "INDIGO",
    name: "InterGlobe Aviation Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "DMART",
    name: "Avenue Supermarts Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BIOCON",
    name: "Biocon Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "RECLTD",
    name: "REC Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "NHPC",
    name: "NHPC Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PIIND",
    name: "PI Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ABBOTINDIA",
    name: "Abbott India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GLAND",
    name: "Gland Pharma Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ALKEM",
    name: "Alkem Laboratories Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "NAVINFLUOR",
    name: "Navin Fluorine International Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TRENT",
    name: "Trent Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "JUBLFOOD",
    name: "Jubilant FoodWorks Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MPHASIS",
    name: "Mphasis Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "OBEROIRLTY",
    name: "Oberoi Realty Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CONCOR",
    name: "Container Corporation of India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ATUL",
    name: "Atul Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "AARTIIND",
    name: "Aarti Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SUNTV",
    name: "Sun TV Network Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MINDTREE",
    name: "Mindtree Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ESCORTS",
    name: "Escorts Kubota Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CHOLAFIN",
    name: "Cholamandalam Investment and Finance Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CROMPTON",
    name: "Crompton Greaves Consumer Electricals Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "DEEPAKNTR",
    name: "Deepak Nitrite Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "POLYCAB",
    name: "Polycab India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "INDIAMART",
    name: "IndiaMART InterMESH Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "METROPOLIS",
    name: "Metropolis Healthcare Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "LALPATHLAB",
    name: "Dr. Lal PathLabs Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ICICISENS",
    name: "ICICI Securities Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HONAUT",
    name: "Honeywell Automation India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BALKRISIND",
    name: "Balkrishna Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GUJGASLTD",
    name: "Gujarat Gas Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MOTILALOFS",
    name: "Motilal Oswal Financial Services Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATACHEM",
    name: "Tata Chemicals Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "RAJESHEXPO",
    name: "Rajesh Exports Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "RAMCOCEM",
    name: "The Ramco Cements Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PFIZER",
    name: "Pfizer Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SYNGENE",
    name: "Syngene International Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "AUBANK",
    name: "AU Small Finance Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "IDBI",
    name: "IDBI Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATACOMM",
    name: "Tata Communications Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GMRINFRA",
    name: "GMR Airports Infrastructure Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "IRCTC",
    name: "Indian Railway Catering & Tourism Corporation Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BATAINDIA",
    name: "Bata India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "LICHSGFIN",
    name: "LIC Housing Finance Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SRTRANSFIN",
    name: "Shriram Transport Finance Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TVSMOTOR",
    name: "TVS Motor Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HINDCOPPER",
    name: "Hindustan Copper Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "JINDALSTEL",
    name: "Jindal Steel & Power Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "NMDC",
    name: "NMDC Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "APLLTD",
    name: "Alembic Pharmaceuticals Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GLENMARK",
    name: "Glenmark Pharmaceuticals Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CANFINHOME",
    name: "Can Fin Homes Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SUNDRMFAST",
    name: "Sundram Fasteners Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CESC",
    name: "CESC Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "FINCABLES",
    name: "Finolex Cables Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "JUBLINGREA",
    name: "Jubilant Ingrevia Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BEML",
    name: "BEML Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "VGUARD",
    name: "V-Guard Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SJVN",
    name: "SJVN Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "IRFC",
    name: "Indian Railway Finance Corporation Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "NH",
    name: "Narayana Hrudayalaya Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "RBLBANK",
    name: "RBL Bank Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CAMS",
    name: "Computer Age Management Services Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "POLYMED",
    name: "Poly Medicure Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ASTRAL",
    name: "Astral Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GRANULES",
    name: "Granules India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MGL",
    name: "Mahanagar Gas Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "AIAENG",
    name: "AIA Engineering Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GODREJIND",
    name: "Godrej Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "INDHOTEL",
    name: "The Indian Hotels Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SOBHA",
    name: "Sobha Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BLUEDART",
    name: "Blue Dart Express Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PVRINOX",
    name: "PVR INOX Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATAMTRDVR",
    name: "Tata Motors DVR",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "JSL",
    name: "Jindal Stainless Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TRIDENT",
    name: "Trident Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CENTURYTEX",
    name: "Century Textiles & Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BHEL",
    name: "Bharat Heavy Electricals Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "IDFC",
    name: "IDFC Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SUNDARMFIN",
    name: "Sundaram Finance Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GODFRYPHLP",
    name: "Godfrey Phillips India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CUMMINSIND",
    name: "Cummins India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "COROMANDEL",
    name: "Coromandel International Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SUPREMEIND",
    name: "Supreme Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SCHAEFFLER",
    name: "Schaeffler India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "THERMAX",
    name: "Thermax Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ABB",
    name: "ABB India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HATSUN",
    name: "Hatsun Agro Product Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "KEI",
    name: "KEI Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GILLETTE",
    name: "Gillette India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SKFINDIA",
    name: "SKF India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MAHLOG",
    name: "Mahindra Logistics Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SPARC",
    name: "Sun Pharma Advanced Research Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "JBCHEPHARM",
    name: "JB Chemicals & Pharmaceuticals Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SFL",
    name: "Sundaram Finance Holdings Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TASTYBITE",
    name: "Tasty Bite Eatables Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MAHSCOOTER",
    name: "Maharashtra Scooters Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "EIDPARRY",
    name: "EID Parry India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "KPRMILL",
    name: "K.P.R. Mill Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SIS",
    name: "SIS Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "JYOTHYLAB",
    name: "Jyothy Labs Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "VSTIND",
    name: "VST Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TTKPRESTIG",
    name: "TTK Prestige Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "IFBIND",
    name: "IFB Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PGHH",
    name: "Procter & Gamble Hygiene & Health Care Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TITAGARH",
    name: "Titagarh Rail Systems Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SANDHAR",
    name: "Sandhar Technologies Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "KALPATPOWR",
    name: "Kalpataru Power Transmission Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HIKAL",
    name: "Hikal Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "RATNAMANI",
    name: "Ratnamani Metals & Tubes Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "NATIONALUM",
    name: "National Aluminium Company Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATAELXSI",
    name: "Tata Elxsi Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "AAVAS",
    name: "Aavas Financiers Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CLEAN",
    name: "Clean Science and Technology Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ROUTE",
    name: "Route Mobile Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CREDITACC",
    name: "CreditAccess Grameen Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "KIMS",
    name: "Krishna Institute of Medical Sciences Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATVA",
    name: "Tatva Chintan Pharma Chem Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GLS",
    name: "Glenmark Life Sciences Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CHEMPLASTS",
    name: "Chemplast Sanmar Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "DEVYANI",
    name: "Devyani International Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "EXIDEIND",
    name: "Exide Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "AMARAJABAT",
    name: "Amara Raja Energy & Mobility Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MRF",
    name: "MRF Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "APARINDS",
    name: "Apar Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "BASF",
    name: "BASF India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "CASTROLIND",
    name: "Castrol India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "FINOLEXIND",
    name: "Finolex Industries Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "GODREJAGRO",
    name: "Godrej Agrovet Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "HGS",
    name: "Hinduja Global Solutions Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "JINDALSAW",
    name: "Jindal Saw Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "KNRCON",
    name: "KNR Constructions Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "MAHSEAMLES",
    name: "Maharashtra Seamless Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "NCC",
    name: "NCC Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ORIENTELEC",
    name: "Orient Electric Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "PERSISTENT",
    name: "Persistent Systems Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "RALLIS",
    name: "Rallis India Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "SWSOLAR",
    name: "Sterling and Wilson Renewable Energy Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "TATAINVEST",
    name: "Tata Investment Corporation Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "UCOBANK",
    name: "UCO Bank",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "VAKRANGEE",
    name: "Vakrangee Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "WELCORP",
    name: "Welspun Corp Ltd.",
    lastClose: getRandomLastClose(),
  },
  {
    symbol: "ZYDUSLIFE",
    name: "Zydus Lifesciences Ltd.",
    lastClose: getRandomLastClose(),
  },
];

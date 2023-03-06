import { AiOutlineUser } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { BsFileEarmarkPost } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { ImBarcode, ImExit } from "react-icons/im";
import {
	MdFastfood,
	MdOutlineBusiness,
	MdOutlineBusinessCenter,
	MdOutlinePersonAddAlt,
} from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import { logout } from "~/services/authService";

export const menus = [
	{
		name: "משתמשים",
		title: "משתמשים",
		link: "/registration-define",
		icon: AiOutlineUser,
		margin: true,
	},
	{
		name: "הגדרת ספק",
		title: "הגדרת ספק",
		link: "/suppliers-define",
		icon: MdFastfood,
	},
	{
		name: "הגדרת מנהלה",
		title: "הגדרת מנהלה",
		link: "/administration-define",
		icon: MdOutlineBusiness,
	},
	{
		name: "הגדרת חברות",
		title: "הגדרת חברות",
		link: "/companies-define",
		icon: MdOutlineBusinessCenter,
	},
	{
		name: "הגדרת מחלקות",
		title: "הגדרת מחלקות",
		link: "/departments-define",
		icon: TbReportAnalytics,
	},
	{
		name: "הגדרת עובדים",
		title: "הגדרת עובדים",
		link: "/employees-define",
		icon: MdOutlinePersonAddAlt,
	},
	{
		name: "הגדרת משמרת",
		title: "הגדרת משמרת",
		link: "/shifts-define",
		icon: BsFileEarmarkPost,
	},
	{
		name: "הגדרת קופון",
		title: "הגדרת קופון",
		link: "/coupons-define",
		icon: BiFoodMenu,
	},
	{
		name: "הגדרת סוגי קופון",
		title: "הגדרת סוגי קופון",
		link: "/coupons-types-define",
		icon: ImBarcode,
	},
	{
		name: "סוגי משתמשים",
		title: "סוגי משתמשים",
		link: "/user-types-define",
		icon: GrUserSettings,
	},
	{
		name: "דוחות",
		title: "דוחות",
		// link: "/report-suppliers-define",
		icon: TbReportSearch,
		onClick: "openReport",
	},
];

export const reports = [
	{
		name: "- ספקים",
		title: "דוחות-ספקים",
		link: "/report-suppliers-define",
	},
	{
		name: "- עובדים",
		title: "דוחות-עובדים",
		link: "/report-employees-define",
	},
	{
		name: "- חברות",
		title: "דוחות-חברות",
		link: "/report-companys-define",
	},
	{
		name: "- הנהלת חשבונות",
		title: "הנהלת-חשבונות",
		link: "/report-bookkeeping-define",
	},
	{
		name: "- חילן",
		title: "דוחות-חילן",
		link: "/report-hilan-define",
	},
	{
		name: "- מנהלה",
		title: "דוחות-מנהלה",
		link: "/report-administration-define",
	},
];

export const settings = [
	{
		name: "הגדרות",
		title: "הגדרות",
		link: "/settings-define",
		icon: RiSettings4Line,
		margin: true,
	},
	{
		name: "יציאה",
		title: "יציאה",
		link: "/",
		icon: ImExit,
		onClick: logout,
	},
];

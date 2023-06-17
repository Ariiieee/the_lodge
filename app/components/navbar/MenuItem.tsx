"use client";

interface MenuItemsProps {
	onClick: () => void;
	label: string;
}

const MenuItem: React.FC<MenuItemsProps> = ({ onClick, label }) => {
	return (
		<div
			className="py-4 px-3 transition font-semibold hover:bg-neutral-100"
			onClick={onClick}
		>
			{label}
		</div>
	);
};

export default MenuItem;

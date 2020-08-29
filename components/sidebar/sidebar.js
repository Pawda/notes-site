import { useState } from "react";
import LinkList from "./LinkList";
const Sidebar = React.forwardRef((props, ref) => {
	const [year, setYear] = useState(props.slug[0]);
	const [module, setModule] = useState(props.slug[1]);
	const toggle = props.toggle ? "" : "hidden md:block";
	function handleChange(event) {
		setModule(false);
		setYear(event.target.value);
	}

	function Module_layer() {
		return (
			<ul className="divide-y divide-gray-400">
				{year &&
					props.tree.children
						.find((x) => x.name === year)
						.children.map((x) => x.name)
						.map((element) => (
							<li key={element} className="p-2 text-center">
								<button onClick={() => setModule(element)}>
									{element.replace(/_/g, " ")}
								</button>
							</li>
						))}
			</ul>
		);
	}

	function Submodule_List() {
		return (
			<ul className="divide-y-4 divide-transparent pt-4">
				{props.tree.children
					.find((x) => x.name === year)
					.children.find((x) => x.name === module)
					.children.sort(function (a, b) {
						if (a.type !== "directory" && b.type === "directory") {
							return -1;
						}
						if (b.type !== "directory" && a.type === "directory") {
							return 1;
						}
						return 0;
					})
					.map(function (elem) {
						if (elem.type !== "directory") {
							return (
								<LinkList
									year={year}
									module={module}
									lecture={elem.name}
								/>
							);
						} else {
							return (
								<li
									key={elem.name}
									className="text-xl font-semibold"
								>
									{elem.name.replace(/_/g, " ")}
									<ul className="text-base font-normal">
										{elem.children.map((lecture) => (
											<LinkList
												key={lecture.name}
												year={year}
												module={module}
												submodule={elem.name}
												lecture={lecture.name}
											/>
										))}
									</ul>
								</li>
							);
						}
					})}
			</ul>
		);
	}

	function Submodule_layer() {
		return (
			<>
				<div className="grid grid-cols-8 gap-2">
					<button
						className="col-span-1"
						onClick={() => setModule(false)}
					>
						<svg
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="h-6"
						>
							<path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
						</svg>
					</button>
					<h1 className="col-span-7 text-2xl">
						{module.replace(/_/g, " ")}
					</h1>
				</div>
				<hr className="mt-2 border-2 border-gray-400" />
				<Submodule_List />
			</>
		);
	}

	function Switching() {
		if (module) {
			return <Submodule_layer />;
		} else {
			return <Module_layer />;
		}
	}

	return (
		<div
			className={`${toggle} sm:relative w-full max-w-xs z-10 main-content fixed`}
			ref={ref}
		>
			<div className="h-full p-4 overflow-x-hidden overflow-y-auto text-black bg-white border-r fixed pt-16 w-64 md:w-1/4 lg:w-1/5 max-w-xs">
				<select
					className="form-select mt-1 block w-full"
					value={year}
					onChange={handleChange}
				>
					{props.tree.children.map((x) => (
						<option key={x.name} value={x.name}>
							{x.name.replace(/_/g, " ")}
						</option>
					))}
				</select>

				<hr className="mt-4 mb-4" />
				<Switching />
			</div>
		</div>
	);
});

Sidebar.displayName = "SideBar";

export default Sidebar;

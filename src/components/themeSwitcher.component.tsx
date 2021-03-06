import { useContext } from "react";
import { ThemeContext } from "../hock-context/themeContext";
import themeColorList from "../utils/themeColorList.json";
import useComponentVisible from "../hock-context/useComponentVisible";
import { TypeThemeColorNameList } from "../types";



const ThemeSwitcher = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
	
	
	const toggleThemeList = () => setIsComponentVisible(!isComponentVisible);
	
	const handleChangeTheme = (themeName: string) => (event: React.MouseEvent<HTMLSpanElement>) => {
		if (themeName !== theme) {
			setTheme(themeName as TypeThemeColorNameList);
		}
		
		toggleThemeList();
	}
	
	return(
		<div className="theme-switcher" ref={ ref }>
			<span
				className="theme-switcher__main"
				onClick={ toggleThemeList }
			/>
			<ul className={ "theme-switcher__dropdown " + ((!isComponentVisible) ? "theme-switcher__dropdown-hide" : "") }
			>
				{ themeColorList.map(theme => {
					return <li className="theme-switcher__item" key={ theme.id }>
						<span
							className="theme-switcher__toggle"
							style={{
								boxShadow: `0 0 5px ${ theme.secondary }`,
								border: `2px solid ${ theme.primary }`,
								background: theme.bg
							}}
							onClick={ handleChangeTheme(theme.theme) }
						/>
					</li>
				}) }
			</ul>
		</div>
	)
}


export default ThemeSwitcher;
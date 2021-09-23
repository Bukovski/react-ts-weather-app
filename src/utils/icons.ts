import icons from './iconsList.json';


interface IIcons {
  [ key: string ]: string | IIcons
}


export default function Icons (iconId: number | string): string {
  const prefix: string = 'wi wi-';

  const iconList: { [key: string]: object } = icons
  const iconObject = iconList[ iconId ] as IIcons
  let icon: string = iconObject.icon as string

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(iconId > 699 && iconId < 800) && !(iconId > 899 && iconId < 1000)) {
    icon = 'day-' + icon;
  }
  
  return prefix + icon;
}

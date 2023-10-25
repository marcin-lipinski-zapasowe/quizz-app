import { Menu } from "semantic-ui-react"

interface Props {
    setActiveItem: (item: string) => void,
    activeItem: string
}

const MenuTabs = [
    {
        name: 'Change profile photo',
        item: 'photo'
    },
    {
        name: 'Change password',
        item: 'password'
    },
    {
        name: 'Change username',
        item: 'username'
    }
]

export default function ProfileMenu({setActiveItem, activeItem}: Props) {
    return (
        <Menu pointing secondary>
            {MenuTabs.map(tab => 
                <Menu.Item
                    name={tab.name}
                    active={activeItem === tab.item}
                    onClick={() => setActiveItem(tab.item)}
                />
            )}
        </Menu>
    )
}
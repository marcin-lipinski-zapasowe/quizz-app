import { observer } from "mobx-react-lite";
import { Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { useState } from "react";
import './ProfilePage.css';
import PhotoUploadWidget from "../../common/imageUpload/PhotoUploadWidget";
import { motion } from "framer-motion";
import ChangePasswordWidget from "./changePassword/ChangePasswordWidget";
import ChangeUsernameWidget from "./changeUsername/ChangeUsernameWidget";
import ProfileMenu from "./profileMenu/ProfileMenu";

export default observer(function ProfilePage(){
    const {userStore, warningFooterStore} = useStore();
    const [activeItem, setActiveItem] = useState('photo');

    function handlePhotoUpload(file: Blob) {
        userStore.changeProfileImage(file).then(() => warningFooterStore.showSuccessWarningFooter("Image uploaded successfuly"));
    }

    const profilePageTabs = new Map
    (
        [['photo', <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={userStore.loading}/>],
         ['password', <ChangePasswordWidget />],
         ['username', <ChangeUsernameWidget />]
        ]
    )

    return (
        <motion.div initial={{marginTop: '100%'}} animate={{marginTop: 0, transition: {duration: 0.5}}} exit={{marginTop: '100%', transition: {duration: 0.5}}}>
            <Segment className="profile-segment" textAlign="center">
                    <Image src={userStore.user?.profileImageUrl} circular className="profile-photo"/>
                    <Header content={userStore.user?.username}></Header>                        
            </Segment>
            <div className="profile-segment menu">
                <ProfileMenu setActiveItem={setActiveItem} activeItem={activeItem}/>                        
                <Segment className="menu-area-segment">
                    {profilePageTabs.get(activeItem)}
                </Segment>
            </div>
        </motion.div>
    )
})
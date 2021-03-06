import { Divider, Menu, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import baseAxios from "../helpers/axios";

const ProfileMenu = ({ control }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await baseAxios.post("auth/logout/");
    navigate("/login");
    return;
  };

  return (
    <Menu control={control}>
      {/* <Menu.Label>Application</Menu.Label>
      <Menu.Item>Settings</Menu.Item>
      <Menu.Item>Messages</Menu.Item>
      <Menu.Item>Gallery</Menu.Item>
      <Menu.Item
        rightSection={
          <Text size="xs" color="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item>
      <Divider />
      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item>Transfer my data</Menu.Item>, */}
      <Menu.Item color="red" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default ProfileMenu;

import { Divider, Menu, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { blackListToken } from "../helpers/helpers";

const ProfileMenu = ({ control }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshTkn = localStorage.getItem("refresh");
    blackListToken(refreshTkn);

    localStorage.removeItem("refresh");
    localStorage.removeItem("access");

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

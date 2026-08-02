import unittest

from app.auth_utils import create_access_token, create_refresh_token, hash_password, verify_password


class AuthUtilsTests(unittest.TestCase):
    def test_password_hashing_and_token_creation(self) -> None:
        password = "StrongPass123"
        hashed_password = hash_password(password)
        self.assertNotEqual(hashed_password, password)
        self.assertTrue(verify_password(password, hashed_password))

        access_token = create_access_token({"sub": "admin@edu.com", "role": "super_admin"})
        self.assertIsInstance(access_token, str)
        self.assertTrue(access_token.startswith("ey"))

        refresh_token = create_refresh_token({"sub": "admin@edu.com"})
        self.assertIsInstance(refresh_token, str)
        self.assertTrue(refresh_token.startswith("ey"))


if __name__ == "__main__":
    unittest.main()

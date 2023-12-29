package webapp;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Random;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class UserEntity {
  private static final int SLAT_SIZE = 16;

  private static MessageDigest digset;

  private static final Random random = new Random();
  static {
    try {
      digset = MessageDigest.getInstance("SHA-256");
    } catch (NoSuchAlgorithmException ignore) {
      // sha 256 is always present
    }
  }

  private byte[] hashPassword(String password) {
    final var saltBytes = generateSalt();
    setSalt(saltBytes);

    return hashPassword(password, saltBytes);
  }

  private static byte[] hashPassword(String password, byte[] salt) {
    final var saltedPassword = concat(salt, password.getBytes(StandardCharsets.UTF_8));
    final var hash = digset.digest(saltedPassword);
    return hash;
  }
  private static byte[] generateSalt() {
    final byte[] salt = new byte[SLAT_SIZE];
    random.nextBytes(salt);

    return salt;
  }

  private static byte[] concat(byte[]... arrays) {
    int length = 0;
    for (byte[] array : arrays) {
      length += array.length;
    }
    byte[] result = new byte[length];
    int pos = 0;
    for (byte[] array : arrays) {
      System.arraycopy(array, 0, result, pos, array.length);
      pos += array.length;
    }
    return result;
  }

  @Id
  private String login;

  private byte[] salt;

  @NotNull
  private byte[] passwordHash;

  public UserEntity(String login, String password) {
    setLogin(login);
    setPassword(password);
  }

  public UserEntity() {
  }

  public byte[] getSalt() {
    return salt;
  }

  public void setSalt(byte[] salt) {
    this.salt = salt;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public void setPasswordHash(byte[] passwordHash) {
    this.passwordHash = passwordHash;
  }

  public byte[] getPasswordHash() {
    return passwordHash;
  }

  public void setPassword(String password) {
    final var hash = hashPassword(password);
    setPasswordHash(hash);
  }

  public boolean validatePassword(String inputPassword) {
    final var inputPasswordHash = hashPassword(inputPassword, getSalt());
    return Arrays.equals(inputPasswordHash, getPasswordHash());
  }
}

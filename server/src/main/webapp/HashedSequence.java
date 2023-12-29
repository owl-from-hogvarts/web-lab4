package webapp;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

import jakarta.persistence.Embeddable;

public record HashedSequence(byte[] hash, byte[] salt) {
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

  public static HashedSequence from(String data) {
    final var saltBytes = generateSalt();
    return from(data, saltBytes);

  }

  public static HashedSequence from(String password, byte[] salt) {
    final var saltedPassword = concat(salt, password.getBytes(StandardCharsets.UTF_8));
    final var hash = digset.digest(saltedPassword);
    return new HashedSequence(hash, salt); 
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

  private static byte[] generateSalt() {
    final byte[] salt = new byte[SLAT_SIZE];
    random.nextBytes(salt);

    return salt;
  }
}

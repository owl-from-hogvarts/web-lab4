package webapp;

import java.util.Arrays;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class UserEntity {

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
    final var sequence = HashedSequence.from(password);
    setPasswordHash(sequence.hash());
    setSalt(sequence.salt());
  }

  public boolean validatePassword(String inputPassword) {
    final var inputPasswordHash = HashedSequence.from(inputPassword, getSalt());
    return Arrays.equals(inputPasswordHash.hash(), getPasswordHash());
  }
}

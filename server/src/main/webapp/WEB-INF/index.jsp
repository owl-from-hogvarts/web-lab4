<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./frontend/styles.css">
    <script type="module" defer src="./frontend/build/index.js"></script>
  </head>
  <body>
    <header>
      <author>
        <name> Тернавский Костя </name>
        <info>
          <group> P3206 </group>
          <variant> 1627 </variant>
        </info>
      </author>
    </header>
    <main>
      <plot class="rounded">
        <canvas id="plot" width="480" height="480"></canvas>
      </plot>
      <form method="get" id="intersect-input-form">
        <settings>
          <field>
            <label>Point(X):</label>
            <content>
              <input
                placeholder="123.456"
                class="rounded"
                type="text"
                id="input-point-x"
                name="pointX"
              />
            </content>
          </field>
          <field>
            <label for="input-point-y">Point(Y):</label>
            <content>
              <input
                placeholder="123.456"
                class="rounded"
                type="text"
                id="input-point-y"
                name="pointY"
              />
            </content>
          </field>
          <field id="scale-input">
            <label>Scale</label>
            <content>
              <scale>
                <input
                  type="checkbox"
                  name="scale"
                  value="1"
                  id="scale-1"
                  checked
                />
                <label for="scale-1">1</label>
              </scale>
              <scale>
                <input
                  type="checkbox"
                  name="scale"
                  value="1.5"
                  id="scale-1.5"
                />
                <label for="scale-1.5">1.5</label>
              </scale>
              <scale>
                <input type="checkbox" name="scale" value="2" id="scale-2" />
                <label for="scale-2">2</label>
              </scale>
              <scale>
                <input
                  type="checkbox"
                  name="scale"
                  value="2.5"
                  id="scale-2.5"
                />
                <label for="scale-2.5">2.5</label>
              </scale>
              <scale>
                <input type="checkbox" name="scale" value="3" id="scale-3" />
                <label for="scale-3">3</label>
              </scale>
            </content>
          </field>
          <button class="rounded" type="submit">Process!</button>
        </settings>
      </form>
      <results-container class="rounded">
        <table id="results-table">
          <thead>
            <tr>
              <th>Point(x)</th>
              <th>Point(y)</th>
              <th>Scale</th>
              <th>Result</th>
              <th>Current Time</th>
              <th>Calculation Time</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </results-container>
    </main>
    <modal>
      <errors-container>
      </errors-container>
    </modal>
  </body>
</html>


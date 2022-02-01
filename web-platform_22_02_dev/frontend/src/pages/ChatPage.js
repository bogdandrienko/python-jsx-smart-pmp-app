import React from "react";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  let navigate = useNavigate();
  let listLoader = new XMLHttpRequest();

  function listLoad() {
    listLoader.open("GET", "http://127.0.0.1:8000/" + "api/router/chat/", true);
    listLoader.send();
  }

  listLoader.addEventListener("readystatechange", () => {
    if (listLoader.readyState === 4) {
      if (listLoader.status === 200) {
        let data = JSON.parse(listLoader.responseText);
        let iterations = JSON.parse(listLoader.responseText).length;
        let s =
          '<table class="table table-bordered table-info table-striped table-hover table-sm"><thead><tr><th scope="col" colspan="1" class="text-center">Автор</th><th scope="col" colspan="1" class="text-center">Дата и время</th><th scope="col" colspan="1" class="text-center">Текст</th></tr></thead><tbody>';
        let d;
        for (let i = 0; i < iterations; i++) {
          d = data[i];
          let datetime;
          datetime = d.created_datetime_field.toString().split("T");
          let date;
          date = datetime[0];
          let time;
          time = datetime[1].split(".")[0];
          s +=
            '<tr><td colspan="1" class="align-bottom text-center">' +
            d.author_char_field +
            '</td><td colspan="1" class="align-bottom text-center">' +
            date +
            " " +
            time +
            '</td><td colspan="1" class="align-bottom text-center">' +
            d.text_field +
            "</td></tr>";
        }
        s += "</tbody></table>";
        let list = document.getElementById("list");
        if (s !== null && list) {
          list.innerHTML = s;
        }
      } else {
        document.getElementById("list").innerHTML = "<h2>-</h2>";
      }
    }
  });

  let CreateSms = async () => {
    fetch(`http://localhost:8000/` + `api/router/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_char_field: author_char_field,
        text_field: text_field,
      }),
    });
    navigate("/chat/");
  };

  let author_char_field;
  let text_field;
  listLoad();
  // window.setInterval(listLoad, 1000);

  return (
    <div>
      <div className="form-control m-1">
        <div>
          <div>
            <div>
              <label className="form-control form-control-lg m-1">
                Author:
                <input
                  type="text"
                  id="username"
                  name="username"
                  required=""
                  placeholder="enter here your name..."
                  minLength="1"
                  maxLength="12"
                  rows="3"
                  className="form-control form-control-lg"
                  autoComplete="true"
                  onChange={(e) => {
                    author_char_field = e.target.value;
                  }}
                />
                <small className="text-muted">lenght: 12 chars</small>
              </label>

              <label className="form-control form-control-lg m-1">
                Data:
                <input
                  type="text"
                  id="data"
                  name="data"
                  required=""
                  placeholder="enter here your sms..."
                  minLength="1"
                  maxLength="16"
                  rows="3"
                  className="form-control form-control-lg"
                  autoComplete="true"
                  onChange={(e) => {
                    text_field = e.target.value;
                  }}
                />
                <small className="text-muted">lenght: 8...16 chars</small>
              </label>
            </div>
          </div>
          <hr />
          <div className="container-fluid text-center">
            <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
              <li className="m-1">
                <button
                  className="btn btn-lg btn-outline-primary"
                  onClick={CreateSms}
                >
                  send
                </button>
              </li>
              <li className="m-1">
                <button
                  className="btn btn-lg btn-outline-primary"
                  type="submit"
                >
                  submit
                </button>
              </li>
              <li className="m-1">
                <button className="btn btn-lg btn-outline-warning" type="reset">
                  reset
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="list"></div>
    </div>
  );
};

export default ChatPage;

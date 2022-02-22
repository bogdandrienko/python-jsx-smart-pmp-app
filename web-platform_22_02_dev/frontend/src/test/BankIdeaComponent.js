import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const BankIdeaComponent = (data = {}) => {
    const idea = data["data"]

    console.log("idea: ", idea)

    function getStaticFile (str) {
        return `/static${str}`
    }

    function getCleanDateTime (dateTime) {
        try {
            return `${dateTime.split("T")[0]} ${dateTime.split("T")[1].slice(0, -14)}`;
          } catch (error) {
            return "ошибка даты"
          }
        
    }

  return (
      
    <li class="m-1">
        <div class="card shadow-sm">
            <div class="card-header">
                <a class="text-decoration-none lead text-dark" href="#">
                    <strong>{idea["name_char_field"]}</strong>
                </a>
            </div>
            <div class="card-header">
                <form action="#" method="POST" class="m-1">
                    <label class="form-control-lg">
                        Скрыть идею:
                        <input type="text"
                            id="hidden"
                            name="hidden"
                            required=""
                            placeholder=""
                            value="false"
                            minlength="0"
                            maxlength="64"
                            class="form-control form-control-lg d-none"
                        />
                        <small class="text-muted">! функционал модератора !</small>
                    </label>
                    <button class="btn btn-sm btn-outline-danger" type="submit">скрыть</button>
                </form>
                <form action="#" method="POST" class="m-1">
                    <label class="form-control-lg">
                        Одобрить идею:
                        <input type="text"
                            id="hidden"
                            name="hidden"
                            required=""
                            placeholder=""
                            value="true"
                            minlength="0"
                            maxlength="64"
                            class="form-control form-control-lg d-none"
                        />
                        <small class="text-muted">! функционал модератора !</small>
                    </label>
                    <button class="btn btn-sm btn-outline-success" type="submit">одобрить</button>
                </form>
                <div class="form-control-lg m-1">
                    Редактировать идею:
                    <a class="btn btn-sm btn-outline-warning" target="_blank" href="#">Редактировать</a>
                </div>
                <div class="container-fluid d-flex justify-content-between">
                        <a class="btn btn-sm btn-outline-success m-1" href="#">
                            Автор: {idea.user_model.last_name_char_field} { idea.user_model.first_name_char_field } {idea.user_model.patronymic_char_field}
                        </a>
                    <a class="btn btn-sm btn-outline-secondary" href="#">{ idea.category_slug_field }</a>
                </div>
            </div>
            <div class="card-body">
                <div class="container-fluid m-1">
                    <a href="#">
                        <img src={getStaticFile(idea["avatar_image_field"])} class="card-img-top img-fluid" alt="id" />
                    </a>
                </div>
                <div class="container-fluid m-1">
                    <small class="text-muted">{idea["short_description_char_field"]}</small>
                </div>
                <div class="container-fluid d-flex justify-content-between m-1">
                    <small class="text-muted">подано: {getCleanDateTime(idea["created_datetime_field"])}</small>
                    <small class="text-muted">зарегистрировано: {getCleanDateTime(idea["register_datetime_field"])}</small>
                </div>
                <div class="container-fluid btn-group">
                    <a class="btn btn-sm btn-outline-primary m-1" href="{% url 'idea_view' idea.id %}">Подробнее</a>
                    <form class="m-1" action="{% url 'account_create_notification' %}" method="POST">
                        <input type="text"
                            id="type_slug_field"
                            name="type_slug_field"
                            required=""
                            placeholder=""
                            value="notifications"
                            class="form-control form-control-lg d-none"
                        />
                        <input type="text"
                            id="name_char_field"
                            name="name_char_field"
                            required=""
                            placeholder=""
                            value="Жалоба на статью в банке идей"
                            class="form-control form-control-lg d-none"
                        />
                        <input type="text"
                            id="text_field"
                            name="text_field"
                            required=""
                            placeholder=""
                            value="[ Пользователь: {{ request.user }} ] | [ id статьи: {{ idea.id }} ] | [ Автор статьи: {{ idea.author_foreign_key_field }} ] | [ Идея в банке идей: {{ idea.name_char_field }} ]"
                            class="form-control form-control-lg d-none"
                        />
                        <button class="btn btn-sm btn-outline-danger" type="submit">Пожаловаться на идею</button>
                    </form>
                </div>
            </div>
            <div class="card-header">
                <ul class="container-fluid col-auto col-md-auto col-lg-auto justify-content-center">
                    <li class="m-1">
                        <a href="#">
                            <div class="btn btn-sm btn-outline-danger">
                                Рейтинг\<sup>оценок</sup>: 1
                                <sup class="text-dark">1</sup>
                            </div>
                            <div class="btn btn-sm btn-outline-success">
                                Рейтинг\<sup>оценок</sup>: 1
                                <sup class="text-dark">2</sup>
                            </div>
                        </a>
                    </li>
                    <li class="m-1">
                        <a href="#" class="text-decoration-none">
                            <small class="text-success">Вам понравилось</small>
                            <small class="text-danger">Вам не понравилось</small>
                            <small class="text-secondary">Вы не оценили</small>
                        </a>
                    </li>
                    <li class="m-1">
                        <a href="#">
                            <div class="btn btn-sm btn-outline-secondary">Комментариев: { idea.get_total_comment_value }</div>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <div class="text-end">
                    <a class="text-decoration-none lead text-dark" href="#">
                        <small># 1</small>
                    </a>
                </div>
            </div>
        </div>
    </li>
  );
};

export default BankIdeaComponent;

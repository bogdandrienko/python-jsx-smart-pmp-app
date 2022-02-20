from typing import List, Optional

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.template import loader

from zerver.lib.avatar import get_gravatar_url
from zerver.lib.exceptions import JsonableError
from zerver.lib.response import json_success
from zerver.lib.streams import get_stream_by_id
from zerver.lib.timestamp import datetime_to_timestamp
from zerver.lib.topic import get_topic_history_for_public_stream, messages_for_topic
from zerver.models import Message, UserProfile


def archive(request: HttpRequest,
            stream_id: int,
            topic_name: str) -> HttpResponse:

    def get_response(rendered_message_list: List[str],
                     is_web_public: bool,
                     stream_name: str) -> HttpResponse:
        return render(
            request,
            'zerver/archive/index.html',
            context={
                'is_web_public': is_web_public,
                'message_list': rendered_message_list,
                'stream': stream_name,
                'topic': topic_name,
            },
        )

    try:
        stream = get_stream_by_id(stream_id)
    except JsonableError:
        return get_response([], False, '')

    if not stream.is_web_public:
        return get_response([], False, '')

    all_messages = list(
        messages_for_topic(
            stream_recipient_id=stream.recipient_id,
            topic_name=topic_name,
        ).select_related('sender').order_by('date_sent'),
    )

    if not all_messages:
        return get_response([], True, stream.name)

    rendered_message_list = []
    prev_sender: Optional[UserProfile] = None
    for msg in all_messages:
        include_sender = False
        status_message = Message.is_status_message(msg.content, msg.rendered_content)
        if not prev_sender or prev_sender != msg.sender or status_message:
            if status_message:
                prev_sender = None
            else:
                prev_sender = msg.sender
            include_sender = True
        if status_message:
            status_message = msg.rendered_content[4+3: -4]
        context = {
            'sender_full_name': msg.sender.full_name,
            'timestampstr': datetime_to_timestamp(msg.last_edit_time
                                                  if msg.last_edit_time
                                                  else msg.date_sent),
            'message_content': msg.rendered_content,
            'avatar_url': get_gravatar_url(msg.sender.delivery_email, 1),
            'include_sender': include_sender,
            'status_message': status_message,
        }
        rendered_msg = loader.render_to_string('zerver/archive/single_message.html', context)
        rendered_message_list.append(rendered_msg)
    return get_response(rendered_message_list, True, stream.name)

def get_web_public_topics_backend(request: HttpRequest, stream_id: int) -> HttpResponse:
    try:
        stream = get_stream_by_id(stream_id)
    except JsonableError:
        return json_success(dict(topics=[]))

    if not stream.is_web_public:
        return json_success(dict(topics=[]))

    result = get_topic_history_for_public_stream(recipient_id=stream.recipient_id)

    return json_success(dict(topics=result))

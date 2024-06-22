#!/bin/bash

cd /var/www

rm -rf /var/www/lawgg

sleep 1

cp -r /home/sp/source/web/dist lawgg

sleep 1

service nginx restart

